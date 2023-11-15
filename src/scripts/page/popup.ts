export function createConfirmDialog(title: string, dialogMessage: string, confirmButton?: YTPopupButton , cancelButton?: YTPopupButton): YTConfirmDialog {
    const confirmDialog: YTConfirmDialog = {
        title: createMessage(title),
        dialogMessages: [ createMessage(dialogMessage) ],
    };

    if (confirmButton) {
        confirmDialog.confirmButton = confirmButton;
    }

    if (cancelButton) {
        confirmDialog.cancelButton = cancelButton;
    }

    return confirmDialog;
}

export function createConfirmPopup(confirmDialog: YTConfirmDialog): YTPopup {
    return {
        confirmDialogRenderer: confirmDialog
    }
}

export function createMessage(message: string): YTMessage {
    return {
        runs: [{
            text: message
        }]
    }
}

export function createButton(text: string, style: YTButtonStyle, size: YTButtonSize): YTPopupButton {
    return {
        buttonRenderer: {
            text: createMessage(text),
            style: style,
            size: size
        }
    }
}

export function openPopup(app: YTApp, popupType: YTPopupType, popup: YTPopup) {
    const openPopupAction = {
        openPopupAction: {
            popupType: popupType,
            popup: popup
        }
    }

    app.openPopup(openPopupAction);
}
