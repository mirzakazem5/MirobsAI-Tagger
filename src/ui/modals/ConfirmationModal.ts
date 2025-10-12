import { App, Modal, ButtonComponent } from 'obsidian';
import type AITaggerPlugin from '../../main';

export class ConfirmationModal extends Modal {
    constructor(app: App, title: string, message: string, onConfirm: () => void, plugin?: AITaggerPlugin) {
        super(app);
        this.containerEl.addClass('ai-tagger-modal-container');
        this.contentEl.addClass('ai-tagger-modal-content');

        // Get translation text or fallback to English
        const cancelText = plugin?.t?.modals?.cancel || 'Cancel';
        const confirmText = plugin?.t?.modals?.confirm || 'Confirm';

        // Create title with warning icon
        const titleEl = this.contentEl.createEl('h3', {
            cls: 'ai-tagger-modal-title',
            text: `${title}`
        });

        // Create message
        const messageEl = this.contentEl.createEl('p', {
            cls: 'ai-tagger-modal-message',
            text: message
        });

        // Create buttons container
        const buttonContainer = this.contentEl.createDiv('ai-tagger-modal-buttons');

        // Add cancel button
        new ButtonComponent(buttonContainer)
            .setButtonText(cancelText)
            .onClick(() => this.close());

        // Add confirm button
        new ButtonComponent(buttonContainer)
            .setButtonText(confirmText)
            .setCta()
            .onClick(() => {
                onConfirm();
                this.close();
            });
    }
}
