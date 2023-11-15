interface YTAction {
    openPopupAction?: YTOpenPopupAction
}

interface YTOpenPopupAction {
    popupType: YTPopupType,
    popup: YTPopup
}

interface YTPopup {
    confirmDialogRenderer?: YTConfirmDialog
}

interface YTConfirmDialog {
    title: YTMessage
    dialogMessages: YTMessage[]
    confirmButton?: YTPopupButton
    cancelButton?: YTPopupButton
}

interface YTPopupButton {
    buttonRenderer: {
        style: YTButtonStyle,
        size: YTButtonSize,
        text: YTMessage
    }
}

interface YTMessage {
    runs: YTText[]
} 

interface YTText {
    text: String
}

declare const enum YTPopupType {
    Dialog = "DIALOG"
}

declare const enum YTButtonStyle {
    BlueText = "STYLE_BLUE_TEXT"
}

declare const enum YTButtonSize {
    Default = "SIZE_DEFAULT"
}
