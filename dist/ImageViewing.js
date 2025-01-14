/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { useCallback, useEffect } from "react";
import { Animated, StyleSheet, View, VirtualizedList, Modal, } from "react-native";
import Orientation from "react-native-orientation-locker";
import ImageItem from "./components/ImageItem/ImageItem";
import ImageDefaultHeader from "./components/ImageDefaultHeader";
import StatusBarManager from "./components/StatusBarManager";
import useAnimatedComponents from "./hooks/useAnimatedComponents";
import useImageIndexChange from "./hooks/useImageIndexChange";
import useRequestClose from "./hooks/useRequestClose";
const DEFAULT_ANIMATION_TYPE = "fade";
const DEFAULT_BG_COLOR = "#000";
const DEFAULT_DELAY_LONG_PRESS = 800;
function ImageViewing({ images, imageIndex, visible, onRequestClose, onLongPress = () => { }, onImageIndexChange, animationType = DEFAULT_ANIMATION_TYPE, backgroundColor = DEFAULT_BG_COLOR, presentationStyle, swipeToCloseEnabled, doubleTapToZoomEnabled, delayLongPress = DEFAULT_DELAY_LONG_PRESS, HeaderComponent, FooterComponent, disablePortraitLock, }) {
    var _a;
    const imageList = React.createRef();
    const [opacity, onRequestCloseEnhanced] = useRequestClose(onRequestClose);
    const [layout, setLayout] = React.useState({ width: 0, height: 0 });
    const [currentImageIndex, onScroll] = useImageIndexChange(imageIndex, layout);
    const [headerTransform, footerTransform, toggleBarsVisible,] = useAnimatedComponents();
    useEffect(() => {
        if (visible) {
            Orientation.unlockAllOrientations();
        }
        return () => {
            if (!disablePortraitLock) {
                Orientation.lockToPortrait();
            }
        };
    }, [visible]);
    useEffect(() => {
        if (onImageIndexChange) {
            onImageIndexChange(currentImageIndex);
        }
    }, [currentImageIndex]);
    const onZoom = useCallback((isScaled) => {
        var _a;
        // @ts-ignore
        (_a = imageList === null || imageList === void 0 ? void 0 : imageList.current) === null || _a === void 0 ? void 0 : _a.setNativeProps({ scrollEnabled: !isScaled });
        toggleBarsVisible(!isScaled);
    }, [imageList]);
    if (!visible) {
        return null;
    }
    const onRequestCloseWithLock = () => {
        if (!disablePortraitLock) {
            Orientation.lockToPortrait();
        }
        onRequestCloseEnhanced();
    };
    return (<Modal transparent={presentationStyle === "overFullScreen"} visible={visible} presentationStyle={presentationStyle} animationType={animationType} onRequestClose={onRequestCloseWithLock} supportedOrientations={["portrait", "landscape"]} hardwareAccelerated>
      <StatusBarManager presentationStyle={presentationStyle}/>
      <View style={[styles.container, { opacity, backgroundColor }]} onLayout={(e) => {
        setLayout(e.nativeEvent.layout);
    }}>
        <Animated.View style={[styles.header, { transform: headerTransform }]}>
          {typeof HeaderComponent !== "undefined"
        ? (React.createElement(HeaderComponent, {
            imageIndex: currentImageIndex,
        }))
        : (<ImageDefaultHeader title={(_a = images[currentImageIndex]) === null || _a === void 0 ? void 0 : _a.title} layout={layout} onRequestClose={onRequestCloseWithLock}/>)}
        </Animated.View>
        <VirtualizedList ref={imageList} data={images} horizontal pagingEnabled windowSize={2} initialNumToRender={1} maxToRenderPerBatch={1} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} initialScrollIndex={imageIndex} getItem={(_, index) => images[index]} getItemCount={() => images.length} getItemLayout={(_, index) => ({
        length: layout.width,
        offset: layout.width * index,
        index,
    })} renderItem={({ item: imageSrc }) => (<ImageItem onZoom={onZoom} imageSrc={imageSrc} onRequestClose={onRequestCloseWithLock} onLongPress={onLongPress} delayLongPress={delayLongPress} swipeToCloseEnabled={swipeToCloseEnabled} doubleTapToZoomEnabled={doubleTapToZoomEnabled} layout={layout}/>)} onMomentumScrollEnd={onScroll} 
    //@ts-ignore
    keyExtractor={(imageSrc) => imageSrc.uri || `${imageSrc}`}/>
        {typeof FooterComponent !== "undefined" && (<Animated.View style={[styles.footer, { transform: footerTransform }]}>
            {React.createElement(FooterComponent, {
        imageIndex: currentImageIndex,
    })}
          </Animated.View>)}
      </View>
    </Modal>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        width: '100%',
    },
    header: {
        position: "absolute",
        width: "100%",
        zIndex: 1,
        top: 0,
    },
    footer: {
        position: "absolute",
        width: "100%",
        zIndex: 1,
        bottom: 0,
    },
});
const EnhancedImageViewing = (props) => (<ImageViewing key={props.imageIndex} {...props}/>);
export default EnhancedImageViewing;
