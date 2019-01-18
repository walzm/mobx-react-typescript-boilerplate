import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { CustomerExt } from './test2';

@observer
class TextRenderer extends React.Component<{ customer: CustomerExt }, {}> {
    render() {
        let x = this.props.customer.addresses.items.map((a, idx) => <div key={idx}>{a.address.value.line1.value}</div>);
        return (
            <div>{this.props.customer.label.value} - {x} </div>
        )
    }
}

export function render(customer: any) {
    ReactDOM.render(<TextRenderer customer={customer} />, document.getElementById('root'));

}