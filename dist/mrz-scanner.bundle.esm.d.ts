import { DSImageData, CapturedResult, EngineResourcePaths, CaptureVisionRouter, CameraEnhancer, CameraView } from '@dynamsoft/dynamsoft-capture-vision-bundle';
export * from '@dynamsoft/dynamsoft-capture-vision-bundle';

declare enum EnumDocumentSide {
    MRZ = "mrz",// The side of the document that contains the MRZ (primary side)
    Opposite = "opposite"
}
declare enum EnumMRZScanMode {
    Passport = "passport",
    TD1 = "td1",
    TD2 = "td2",
    PassportAndTD1 = "passportAndTd1",
    PassportAndTD2 = "passportAndTd2",
    TD1AndTD2 = "td1AndTd2",
    All = "all"
}
declare enum EnumMRZDocumentType {
    Passport = "passport",
    TD1 = "td1",
    TD2 = "td2"
}
declare enum EnumMRZScannerViews {
    Scanner = "scanner",
    Result = "scan-result"
}
declare const DEFAULT_TEMPLATE_NAMES: {
    passport: string;
    td1: string;
    td2: string;
    passportAndTd1: string;
    passportAndTd2: string;
    td1AndTd2: string;
    all: string;
};
type UtilizedTemplateNames = Record<EnumMRZScanMode, string>;
declare enum EnumResultStatus {
    RS_SUCCESS = 0,
    RS_CANCELLED = 1,
    RS_FAILED = 2
}
type ResultStatus = {
    code: EnumResultStatus;
    message?: string;
};
type ToolbarButtonConfig = Pick<ToolbarButton, "icon" | "label" | "className" | "isHidden">;
interface ToolbarButton {
    id: string;
    icon: string;
    label: string;
    onClick?: () => void | Promise<void>;
    className?: string;
    isDisabled?: boolean;
    isHidden?: boolean;
}

declare enum EnumMRZData {
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
interface MRZResult {
    status?: EnumResultStatus;
    data?: MRZData;
    getDocumentImage(side: EnumDocumentSide): DSImageData | null;
    getOriginalImage(side: EnumDocumentSide): DSImageData | null;
    getPortraitImage(): DSImageData | null;
}
interface MRZData {
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
interface MRZDate {
    year: number;
    month: number;
    day: number;
}
declare const MRZDataLabel: Record<EnumMRZData, string> & Record<string, string>;
declare function displayMRZDate(date: MRZDate): string;

interface MRZScannerViewConfig {
    cameraEnhancerUIPath?: string;
    uiPath?: string;
    container?: HTMLElement | string;
    templateFilePath?: string;
    utilizedTemplateNames?: UtilizedTemplateNames;
    mrzFormatType?: EnumMRZDocumentType | Array<EnumMRZDocumentType>;
    showScanGuide?: boolean;
    showUploadImage?: boolean;
    showFormatSelector?: boolean;
    showSoundToggle?: boolean;
    showPoweredByDynamsoft?: boolean;
    enableMultiFrameCrossFilter?: boolean;
    uploadAcceptedTypes?: string;
    uploadFileConverter?: (file: File) => Promise<Blob>;
    flipDocumentTimeout?: number;
}
declare class MRZScannerView {
    private resources;
    private config;
    private isSoundFeedbackOn;
    private scanModeManager;
    private currentScanMode;
    private resizeTimer;
    private capturedResultItems;
    private originalImageData;
    private initialized;
    private initializedDCE;
    private isMRZScanned;
    private isPortraitScanned;
    private areSidesDifferent;
    private isWaitingForFlip;
    private flipTimeoutHandle;
    private flipCountdownHandle;
    private isWaitingForPortraitAfterMRZ;
    private isProcessingPortraitFrame;
    private mrzSideData;
    private DCE_ELEMENTS;
    private statusMessageElement;
    private currentScanResolver?;
    private loadingScreen;
    private showScannerLoadingOverlay;
    private hideScannerLoadingOverlay;
    private handleResize;
    constructor(resources: SharedResources, config: MRZScannerViewConfig);
    initialize(): Promise<void>;
    private initializeElements;
    private setupScanModeSelector;
    private assignDCEClickEvents;
    private handleCloseBtn;
    private attachOptionClickListeners;
    private highlightCameraAndResolutionOption;
    private toggleSelectCameraBox;
    private relaunch;
    private uploadFile;
    private toggleSoundFeedback;
    private calculateScanRegion;
    private toggleScanGuide;
    openCamera(): Promise<void>;
    closeCamera(hideContainer?: boolean): Promise<void>;
    pauseCamera(): void;
    stopCapturing(): void;
    handleMRZResult(result: CapturedResult): Promise<void>;
    private initializeScanModeManager;
    private getScanMode;
    private DCEShowToast;
    private firstFrame;
    private startCapturing;
    private toggleScanDocType;
    launch(): Promise<MRZResult>;
    /**
     * Validates that the portrait quad is within the document quad and meets size requirements.
     * Based on Android implementation (MRZScanner-Mobile.java lines 70-80).
     */
    /**
     * Creates and returns the status message element for display in the scanner.
     */
    private createStatusMessageElement;
    /**
     * Shows a status message to guide the user during scanning.
     */
    private showStatusMessage;
    /**
     * Hides the status message.
     */
    private hideStatusMessage;
    /**
     * Shows a green border on the scan guide to indicate success.
     */
    private showSuccessBorder;
    /**
     * Handles the first scan (MRZ side) of the document.
     * Extracts MRZ data, document image, and attempts portrait extraction.
     * If portrait is not found and returnPortraitImage=true, prepares for second scan.
     */
    private handleMRZSideScan;
    /**
     * Called on every frame during the 1-second portrait wait window (after MRZ is detected).
     * Attempts portrait detection on the same side; if found, completes the scan without
     * requiring a document flip. Uses the flag as its own re-entry guard:
     * setting it to false at the start blocks other frames; if portrait is not found it is
     * restored so the next frame can try again.
     */
    private tryPortraitOnSameSide;
    /**
     * Handles the second scan (portrait side) of the document.
     * Called on every frame after the flip-document timer expires.
     * Mirrors the Android `onNoMRZPageReceived` logic: only resolves when a portrait
     * is actually detected. If portrait is not found on the current frame the guard is
     * released and scanning continues on the next frame.
     */
    private handlePortraitSideScan;
    /**
     * Resets the multi-side scanning state for a new scan session.
     */
    private resetScanningState;
    private validatePortraitLocation;
    /**
     * Point-in-polygon test using ray casting algorithm.
     * Tests if a point is inside a quadrilateral.
     */
    private isPointInQuadrilateral;
}

interface MRZResultViewToolbarButtonsConfig {
    cancel?: ToolbarButton;
    rescan?: ToolbarButtonConfig;
    done?: ToolbarButtonConfig;
}
interface MRZResultViewConfig {
    container?: HTMLElement | string;
    toolbarButtonsConfig?: MRZResultViewToolbarButtonsConfig;
    showOriginalImage?: boolean;
    showMRZText?: boolean;
    allowResultEditing?: boolean;
    emptyResultMessage?: string;
    onDone?: (result: MRZResult) => Promise<void>;
    onCancel?: (result: MRZResult) => Promise<void>;
    _isFileMode?: boolean;
}
declare class MRZResultView {
    private resources;
    private config;
    private scannerView;
    private currentScanResultViewResolver?;
    private editedFields;
    constructor(resources: SharedResources, config: MRZResultViewConfig, scannerView: MRZScannerView);
    launch(): Promise<MRZResult>;
    private handleRescan;
    private handleCancel;
    private handleDone;
    private createControls;
    private getImagesToDisplay;
    private createImagesDisplay;
    private handleFieldEdit;
    private createMRZDataDisplay;
    initialize(): Promise<void>;
    hideView(): void;
    dispose(preserveResolver?: boolean): void;
}

interface MRZScannerConfig {
    license?: string;
    container?: HTMLElement | string;
    templateFilePath?: string;
    utilizedTemplateNames?: UtilizedTemplateNames;
    engineResourcePaths?: EngineResourcePaths;
    scannerViewConfig?: Omit<MRZScannerViewConfig, "templateFilePath" | "utilizedTemplateNames">;
    resultViewConfig?: MRZResultViewConfig;
    mrzFormatType?: Array<EnumMRZDocumentType>;
    showResultView?: boolean;
    returnOriginalImage?: boolean;
    returnDocumentImage?: boolean;
    returnPortraitImage?: boolean;
}
interface SharedResources {
    cvRouter?: CaptureVisionRouter;
    cameraEnhancer?: CameraEnhancer;
    cameraView?: CameraView;
    result?: MRZResult;
    onResultUpdated?: (result: MRZResult) => void;
    returnOriginalImage?: boolean;
    returnDocumentImage?: boolean;
    returnPortraitImage?: boolean;
}
declare class MRZScanner {
    private config;
    private scannerView?;
    private resultView?;
    private resources;
    private isInitialized;
    private isCapturing;
    private loadingScreen;
    private isDynamsoftResourcesLoaded;
    protected isFileMode: boolean;
    private showLoadingOverlay;
    private hideLoadingOverlay;
    constructor(config: MRZScannerConfig);
    initialize(): Promise<{
        resources: SharedResources;
        components: {
            scannerView?: MRZScannerView;
            resultView?: MRZResultView;
        };
    }>;
    private initializeDynamsoftResources;
    private initializeDCVResources;
    private shouldCreateDefaultContainer;
    private createDefaultMRZScannerContainer;
    private checkForTemporaryLicense;
    private validateViewConfigs;
    private showResultView;
    private initializeMRZScannerConfig;
    private createViewContainers;
    dispose(): void;
    /**
     * Processes an uploaded image file
     * @param imageOrFile The file to process
     * @returns Promise with the document result
     */
    private processUploadedFile;
    launch(imageOrFile?: Blob | string | DSImageData | HTMLImageElement | HTMLVideoElement | HTMLCanvasElement): Promise<MRZResult>;
}

declare const DynamsoftMRZScanner: {
    MRZScanner: typeof MRZScanner;
    MRZScannerView: typeof MRZScannerView;
    MRZResultView: typeof MRZResultView;
};

export { DEFAULT_TEMPLATE_NAMES, DynamsoftMRZScanner, EnumMRZData, EnumMRZDocumentType, EnumMRZScanMode, EnumMRZScannerViews, EnumResultStatus, MRZDataLabel, MRZResultView, MRZScanner, MRZScannerView, displayMRZDate };
export type { MRZData, MRZDate, MRZResult, MRZResultViewConfig, MRZResultViewToolbarButtonsConfig, MRZScannerViewConfig, ResultStatus, ToolbarButton, ToolbarButtonConfig, UtilizedTemplateNames };
