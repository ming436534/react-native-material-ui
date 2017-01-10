/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent, PropTypes } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */
import Icon from '../Icon';
import RippleFeedback from '../RippleFeedback';

const propTypes = {
    /**
    * If passed in, this component will render image.
    */
    image: PropTypes.shape({ type: PropTypes.oneOf([Image]) }),
    /**
    * If passed in, this component will render icon element inside avatar.
    */
    icon: PropTypes.string,
    /**
    * If passed in, this component will render text element inside avatar.
    */
    text: PropTypes.string,
    /**
    * It's just sugar for: style: { width: size, height: size, borderRadius: size / 2 }
    */
    size: PropTypes.number,
    /**
    * Inline style of avatar
    */
    style: PropTypes.shape({
        container: View.propTypes.style,
        content: Text.propTypes.style,
    }),
    /**
     * Padding factor
     */
    factor: PropTypes.number,
    /**
     * onPress
     */
    onPress: PropTypes.func,
};
const defaultProps = {
    style: {},
    factor: 1,
    onPress: () => {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    const { avatar } = context.uiTheme;
    const { size, factor } = props;
    const local = {};

    if (size) {
        local.container = {
            height: size * factor,
            width: size * factor,
            borderRadius: size * factor / 2,
        };
    }

    return {
        container: [
            avatar.container,
            local.container,
            props.style.container,
        ],
        content: [
            avatar.content,
            local.content,
            props.style.content,
        ],
    };
}

class Avatar extends PureComponent {
    render() {
        const { image, icon, text, onPress } = this.props;

        let content = null;
        const { avatar, spacing } = this.context.uiTheme;
        const styles = getStyles(this.props, this.context);

        if (icon) {
            const color = StyleSheet.flatten(avatar.content).color;
            content = <Icon name={icon} color={color} size={spacing.iconSize} />;
        } else if (text) {
            content = <Text style={styles.content}>{text}</Text>;
        } else if (image) {
            content = image;
        }


        return (
            <RippleFeedback onPress={onPress}>
                <View style={styles.container} >
                    {content}
                </View>
            </RippleFeedback>
        );
    }
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;
Avatar.contextTypes = contextTypes;

export default Avatar;
