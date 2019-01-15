import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer } from 'mobx-react';

@observer
class TextRenderer extends React.Component<{ customer: any }, {}> {
    render() {
        let x = this.props.customer.addresses.items.map((address, idx) => <div key={idx}>{address.line1.value}</div>);
        return (
            <div>{this.props.customer.name.value} : {this.props.customer.address.value.line1.value} : {x} </div>
        )
    }
}

export function render(customer: any) {
    ReactDOM.render(<TextRenderer customer={customer} />, document.getElementById('root'));

}