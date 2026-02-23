import { DSImageData, ParsedResultItem } from "@dynamsoft/dynamsoft-capture-vision-bundle";
import { EnumDocumentSide, EnumResultStatus } from "./types";
export declare enum EnumMRZData {
    InvalidFields = "invalidFields",
    DocumentType = "documentType",
    DocumentNumber = "documentNumber",
    MRZText = "mrzText",
    FirstName = "firstName",
    LastName = "lastName",
    Age = "age",
    Sex = "sex",
    IssuingState = "issuingState",
    IssuingStateRaw = "issuingStateRaw",
    Nationality = "nationality",
    NationalityRaw = "nationalityRaw",
    DateOfBirth = "dateOfBirth",
    DateOfExpiry = "dateOfExpiry",
    OptionalData1 = "optionalData1",
    OptionalData2 = "optionalData2"
}
export interface MRZResult {
    status?: EnumResultStatus;
    data?: MRZData;
    getDocumentImage(side: EnumDocumentSide): DSImageData | null;
    getOriginalImage(side: EnumDocumentSide): DSImageData | null;
    getPortraitImage(): DSImageData | null;
}
export interface MRZData {
    [EnumMRZData.InvalidFields]?: EnumMRZData[];
    [EnumMRZData.DocumentType]: string;
    [EnumMRZData.DocumentNumber]: string;
    [EnumMRZData.MRZText]: string;
    [EnumMRZData.FirstName]: string;
    [EnumMRZData.LastName]: string;
    [EnumMRZData.Age]: number;
    [EnumMRZData.Sex]: string;
    [EnumMRZData.IssuingState]: string;
    [EnumMRZData.IssuingStateRaw]: string;
    [EnumMRZData.Nationality]: string;
    [EnumMRZData.NationalityRaw]: string;
    [EnumMRZData.DateOfBirth]: MRZDate;
    [EnumMRZData.DateOfExpiry]: MRZDate;
    [EnumMRZData.OptionalData1]?: string;
    [EnumMRZData.OptionalData2]?: string;
}
export interface MRZDate {
    year: number;
    month: number;
    day: number;
}
export declare const MRZDataLabel: Record<EnumMRZData, string> & Record<string, string>;
export declare function displayMRZDate(date: MRZDate): string;
export declare function processMRZData(mrzText: string, parsedResult: ParsedResultItem): MRZData | null;
/**
 * Internal implementation of the MRZResult interface.
 * Construction sites should use createMRZResult() rather than instantiating this directly.
 */
export declare class MRZResultImpl implements MRZResult {
    status?: EnumResultStatus;
    data?: MRZData;
    private _primaryOriginalImage;
    private _secondaryOriginalImage;
    private _primaryDocumentImage;
    private _secondaryDocumentImage;
    private _portraitImage;
    constructor(init: {
        status?: EnumResultStatus;
        data?: MRZData;
        primaryOriginalImage?: DSImageData | null;
        secondaryOriginalImage?: DSImageData | null;
        primaryDocumentImage?: DSImageData | null;
        secondaryDocumentImage?: DSImageData | null;
        portraitImage?: DSImageData | null;
    });
    getDocumentImage(side: EnumDocumentSide): DSImageData | null;
    getOriginalImage(side: EnumDocumentSide): DSImageData | null;
    getPortraitImage(): DSImageData | null;
}
//# sourceMappingURL=MRZParser.d.ts.map