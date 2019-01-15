var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
let TextRenderer = class TextRenderer extends React.Component {
    render() {
        let x = this.props.customer.addresses.items.map((address, idx) => React.createElement("div", { key: idx }, address.line1.value));
        return (React.createElement("div", null,
            this.props.customer.name.value,
            " : ",
            this.props.customer.address.value.line1.value,
            " : ",
            x,
            " "));
    }
};
TextRenderer = __decorate([
    observer
], TextRenderer);
export function render(customer) {
    ReactDOM.render(React.createElement(TextRenderer, { customer: customer }), document.getElementById('root'));
}
