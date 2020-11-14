import React, {useState} from 'react';
import {View, Text, SafeAreaView, Dimensions, StyleSheet, FlatList, ImageBackground} from 'react-native';
import Video from "react-native-video";
import {
    OffsetYProvider,
    IndexProvider,
    InCenterConsumer
  } from "@n1ru4l/react-in-center-of-screen";

const { width, height } = Dimensions.get("window");

const boxHeight = height / 2;

const DATA = ['1', '2', '3', '4', '5', '6', '7'];
const image = { uri: "https://reactjs.org/logo-og.png" };

export default HomeScreen = () => {


    const section = ({item, index}) => {

        if (index === 1 || index == 4 || index == 6) {
            return (
                <View>
                    <FlatList 
                        horizontal
                        data={DATA}
                        renderItem={() => {
                            return (
                                <View style={{height: 200, width: 200, backgroundColor: 'black', margin: 10}} >
                                        <ImageBackground source={{uri: 'https://assets.bigcartel.com/product_images/279708584/ORG+LOGO+HAT+WHT.jpg?auto=format&fit=max&w=1200'}} style={styles.image} />
                                </View>
                            )
                        }}
                        keyExtractor={item => item}   
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            )
        } else if (index == 2) {
            return (
                <View style={{height: boxHeight, borderWidth: 1, width: width, marginVertical: 5}}>
                    <ImageBackground source={{uri: 'https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/66827973_10157198101861702_9198974174482137088_n.jpg?_nc_cat=108&ccb=2&_nc_sid=174925&_nc_ohc=fYXlbPY4f7oAX-JEts1&_nc_ht=scontent-lax3-1.xx&oh=e792d5681f9746a5ee16b90ff0f917fc&oe=5FC65F62'}} style={styles.image} />
                </View>
            )
        } else {
            return (
                <IndexProvider index={index}>
                    {() => (
                        <View style={{height: boxHeight, borderWidth: 1, width: width, marginVertical: 5}}>
                            <InCenterConsumer>
                                {({ isInCenter }) =>
                                    <Video
                                        source={{uri:"https://steezy-app.s3-us-west-1.amazonaws.com/LockWest.mp4"}}
                                        style={StyleSheet.absoluteFill}
                                        muted={true}
                                        repeat={true}
                                        resizeMode="cover"
                                        rate={1.0}
                                        ignoreSilentSwitch={"obey"}
                                        paused={!isInCenter}
                                        poster="https://baconmockup.com/300/200/"
                                    />
                                }
                            </InCenterConsumer>
                        </View>
                    )}
                </IndexProvider>
            )
        }
    }    

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={{paddingHorizontal: 20, marginVertical: 30}}>
                <Text style={{textAlign: 'left', fontWeight: 'bold', fontSize: 22}}>
                    New Steazy
                </Text>
            </View>
            <OffsetYProvider
                columnsPerRow={1}
                listItemHeight={boxHeight}
                centerYStart={0}
                centerYEnd={(height * 1) / .5}
            >
                {({ setOffsetY }) => (
                    <FlatList 
                        data={DATA}
                        renderItem={section}
                        keyExtractor={item => item}   
                        onScroll={ev => {
                            setOffsetY(ev.nativeEvent.contentOffset.y);
                        }} 
                    />
                )}
            </OffsetYProvider>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  backgroundVideo: {
    height: boxHeight * 75,
    width: 300,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});