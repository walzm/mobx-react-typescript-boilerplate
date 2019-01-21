export const BaseFieldMetadataProperties = [
    "label",
    "shortLabel",
    "hidden",
    "messages",
];
export class BaseField {
    setLabel(label) {
        if (label !== this.state.label) {
            this.state = Object.assign({}, this.state, { label });
        }
    }
    setShortLabel(shortLabel) {
        if (shortLabel !== this.state.shortLabel) {
            this.state = Object.assign({}, this.state, { shortLabel });
        }
    }
    setHidden(hidden) {
        if (hidden !== this.state.hidden) {
            this.state = Object.assign({}, this.state, { hidden });
        }
    }
    setMessages(messages) {
        if (messages !== this.state.messages) {
            this.state = Object.assign({}, this.state, { messages });
        }
    }
}
