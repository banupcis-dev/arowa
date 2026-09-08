import { validatePersonalInformation } from "./personalValidation";
import { validateAddress } from "./addressValidation";
import { validateParentInformation } from "./parentValidation";
import { validateImage } from "./imageValidation";
import { validateDocuments } from "./documentValidation";
import { validateDeclaration } from "./declarationValidation";

export const validateSubmit = (data) => {
  return {
    personal: validatePersonalInformation(data),
    birthAddress: validateAddress(data.birthAddress),
    presentAddress: validateAddress(data.presentAddress),
    permanentAddress: validateAddress(data.permanentAddress),
    parent: validateParentInformation(data),
    image: validateImage(data.image),
    documents: validateDocuments(data.files),
    declaration: validateDeclaration(data),
  };
};