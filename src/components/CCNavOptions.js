import { Platform } from 'react-native';
import Colors from '../constants/Colors';

export default class CCNavOptions {
    /**
     * Creates an instance of the CCNavOptions component.
     * This component is used to create an easily duplicated uniform looking nav bar throughout the app 
     * without duplicating code.
     * @param {*} params - param object for the nav bar of the form (all params are optional): 
     * {
     *      title? : string
     *      backgroundColor? : string
     *      headerTintColor?: string
     * }
     */
    constructor(params){
        this.title = params.title ? params.title : '';
        this.headerStyle = {
            backgroundColor: params.backgroundColor ? params.backgroundColor : Colors.GS_Color_Contrast_4,
            ...Platform.select({
                ios: {
                  shadowColor: 'black',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.4,
                  shadowRadius: 5,
                },
                android: {
                  elevation: 5,
                },
            })
        };
        this.headerTintColor = params.headerTintColor ? params.headerTintColor : Colors.GS_Color_Contrast_1;
    }
}
