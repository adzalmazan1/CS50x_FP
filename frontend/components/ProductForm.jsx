import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from "@/constants/color.js"
import { genStyles } from '@/assets/styles/general.styles.js';
import { ErrorBox } from '@/components/ErrorBox';

export const ProductForm = (
        { 
            formTitle, subLoading, submitForm, toAct, currentAct, 
            formError, setFormError, handleReturn, itemVal, setItemVal, 
            priceVal, setPriceVal, itemHolder, priceHolder
        }
    ) => {
    return (
        <View style={genStyles.container}>
            <View style={genStyles.content}>
                <View style={genStyles.header}>
                    {/* Close button header */}
                    <TouchableOpacity>
                            <MaterialIcons name="cancel" size={24} color={COLORS.text} onPress={handleReturn}/>
                    </TouchableOpacity>
                </View>

                <View style={genStyles.form}>
                    <Text style={genStyles.formTitle}>{formTitle}</Text>
                    {/* Item input */}
                    <TextInput
                        autoCapitalize="none"
                        autocomplete={false}
                        autoCorrect={false}
                        clearButtonMode="always"
                        style={[genStyles.searchBar, { marginBottom : 20, color: COLORS.borderDrk }, formError && genStyles.errorInput]} // edit error behavior
                        placeholder={itemHolder}
                        value={itemVal}
                        onChangeText={(item) => {
                            setItemVal(item);
                        }}
                    />
                    
                    {/* Base price input */}
                    <TextInput
                        autoCapitalize="none"
                        autocomplete={false}
                        autoCorrect={false}
                        clearButtonMode="always"
                        style={[genStyles.searchBar, { marginBottom : 0, color: COLORS.borderDrk}, formError && genStyles.errorInput]}
                        placeholder={priceHolder}
                        value={priceVal}
                        onChangeText={(price) => {
                            const isDecimal = price.replace(/[^0-9.]/g, '').replace(/(\..*?)\./g, '$1'); // allows decimal format input
                            setPriceVal(isDecimal);
                        }}
                    />
                    
                    <TouchableOpacity style={[genStyles.submitButton, subLoading && {backgroundColor : COLORS.card}]} onPress={submitForm} disabled={subLoading}>
                        <Text style={genStyles.subButtonTxt}>{subLoading ? currentAct :  toAct}</Text>
                    </TouchableOpacity>
                </View>

                <ErrorBox error={formError} setError={setFormError}/>
            </View>
        </View>
    );

}