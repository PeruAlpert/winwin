import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    ImageBackground,
    Image
} from 'react-native';
import { Styles } from './Styles';
import { saveIntroScreen } from '../../utils';
import Carousel from 'react-native-snap-carousel';

let { width } = Dimensions.get('window');
const backgroundImage = require('../../assets/images/background.jpg');
const logoImage = require('../../assets/images/white_logo.png');
const CAROUSEL_DATA = [
    {
        source: require('../../assets/images/intro-swiper/screen1.jpeg')
    },
    {
        source: require('../../assets/images/intro-swiper/screen2.jpeg')
    },
    {
        source: require('../../assets/images/intro-swiper/screen3.jpeg')
    },
    {
        source: require('../../assets/images/intro-swiper/screen4.jpeg')
    },
    {
        source: require('../../assets/images/intro-swiper/screen5.jpeg')
    },
    {
        source: require('../../assets/images/intro-swiper/screen6.jpeg')
    },
    {
        source: require('../../assets/images/intro-swiper/screen7.jpeg')
    }
]

class Intro extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        saveIntroScreen((isIntroSaved) => {
            if (isIntroSaved) {
                console.log('Intro Screen has been saved successfully to localStorage');
            } else {
                console.log('Cannot Save Intro Screen to localStorage');
            }
        })
    }

    renderItem({ item, index }) {
        return (
            <Image
                resizeMode={'contain'}
                style={Styles.image}
                source={item.source}
            />
        );
    }

    render() {
        let { navigation } = this.props;

        return (
            <View style={Styles.mainContainer}>
                <ImageBackground
                    style={Styles.backgroundImage}
                    source={backgroundImage}>
                    <Image
                        resizeMode='contain'
                        style={Styles.logo}
                        source={logoImage} />
                    <Text style={Styles.description} >
                        Win-Win App will  help you to save unlimited package of money based on Win-Win situation just discover how we'll do it together.                     </Text>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={CAROUSEL_DATA}
                        renderItem={this.renderItem.bind(this)}
                        sliderWidth={width}
                        itemWidth={200}
                        firstItem={0}
                        // inactiveSlideScale={0.94}
                        inactiveSlideOpacity={0.7}
                        // inactiveSlideShift={20}
                        //containerCustomStyle={styles.slider}
                        //contentContainerCustomStyle={styles.sliderContentContainer}
                        loop={false}
                        autoplay={true}
                        //onSnapToItem={(index) => this.setState({ sliderActiveSlide: index }, () => console.warn('ActiveSlide', this.state.sliderActiveSlide))}
                        //loopClonesPerSide={2}
                        autoplayDelay={1000}
                        autoplayInterval={3000}
                    />
                    <Text onPress={() => navigation.navigate('Auth')} style={Styles.skipText}>
                        SKIP
                    </Text>
                </ImageBackground>
            </View>
        );
    }
}

export { Intro };