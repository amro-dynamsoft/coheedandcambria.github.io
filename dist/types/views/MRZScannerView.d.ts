import { CapturedResult } from "@dynamsoft/dynamsoft-capture-vision-bundle";
import { SharedResources } from "../MRZScanner";
import { UtilizedTemplateNames, EnumMRZDocumentType } from "./utils/types";
import { MRZResult } from "./utils/MRZParser";
export interface MRZScannerViewConfig {
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
export default class MRZScannerView {
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
//# sourceMappingURL=MRZScannerView.d.ts.map