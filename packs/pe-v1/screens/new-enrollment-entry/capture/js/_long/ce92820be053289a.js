//-----------------------------------------------------------------------------------------
// This code is the property of Gainwell Technology, Copyright (c) 2021. All rights reserved.
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------

//---------------------------------------------
// Group Facility Identification functions
//---------------------------------------------

function validateGroupFacility() {
    var isValid = true;
    if ($("#Provider_DurableMedicalEquipment_MedicaidSuretyBondNumber").val() != '') {
        if ($("#Provider_DurableMedicalEquipment_MedicaidSuretyBondNumberEffectiveDate").val() == '') {
            isValid = false;
            setKendoValidatorFieldMessage($("#Provider_DurableMedicalEquipment_MedicaidSuretyBondNumberEffectiveDate"), medicaidEffectiveDate_Required);
        }
        if ($("#Provider_DurableMedicalEquipment_MedicaidSuretyBondNumberEndDate").val() == '') {
            isValid = false;
            setKendoValidatorFieldMessage($("#Provider_DurableMedicalEquipment_MedicaidSuretyBondNumberEndDate"), medicaidEndDate_Required);
        }
    }

    if ($("#Provider_DurableMedicalEquipment_MedicareSuretyBondNumber").val() != '') {
        if ($("#Provider_DurableMedicalEquipment_MedicareSuretyBondNumberEffectiveDate").val() == '') {
            isValid = false;
            setKendoValidatorFieldMessage($("#Provider_DurableMedicalEquipment_MedicareSuretyBondNumberEffectiveDate"), medicareEffectiveDate_Required);
        }
        if ($("#Provider_DurableMedicalEquipment_MedicareSuretyBondNumberEndDate").val() == '') {
            isValid = false;
            setKendoValidatorFieldMessage($("#Provider_DurableMedicalEquipment_MedicareSuretyBondNumberEndDate"), medicareEndDate_Required);
        }
    }

    if ($("#Provider_DurableMedicalEquipment_MedicaidSuretyBondNumberEffectiveDate").val() != '' && $("#Provider_DurableMedicalEquipment_MedicaidSuretyBondNumberEndDate").val() != '' && (new Date($("#Provider_DurableMedicalEquipment_MedicaidSuretyBondNumberEffectiveDate").val()) > new Date($("#Provider_DurableMedicalEquipment_MedicaidSuretyBondNumberEndDate").val()))) {
        isValid = false;
        setKendoValidatorFieldMessage($("#Provider_DurableMedicalEquipment_MedicaidSuretyBondNumberEndDate"), priorEndDate_Validation);
    }
    if ($("#Provider_DurableMedicalEquipment_MedicareSuretyBondNumberEffectiveDate").val() != '' && $("#Provider_DurableMedicalEquipment_MedicareSuretyBondNumberEndDate").val() != '' && (new Date($("#Provider_DurableMedicalEquipment_MedicareSuretyBondNumberEffectiveDate").val()) > new Date($("#Provider_DurableMedicalEquipment_MedicareSuretyBondNumberEndDate").val()))) {
        isValid = false;
        setKendoValidatorFieldMessage($("#Provider_DurableMedicalEquipment_MedicareSuretyBondNumberEndDate"), priorEndDate_Validation);
    }
    if ($("#Provider_DurableMedicalEquipment_MedicareAccreditationEffectiveDate").val() != '' && $("#Provider_DurableMedicalEquipment_MedicareAccreditationEndDate").val() != '' && (new Date($("#Provider_DurableMedicalEquipment_MedicareAccreditationEffectiveDate").val()) > new Date($("#Provider_DurableMedicalEquipment_MedicareAccreditationEndDate").val()))) {
        isValid = false;
        setKendoValidatorFieldMessage($("#Provider_DurableMedicalEquipment_MedicareAccreditationEndDate"), priorEndDate_Validation);
    }

    return isValid;
}
