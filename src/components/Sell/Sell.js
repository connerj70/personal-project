import React, {Component} from 'react';

class Sell extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <form>
                    <input placeholder="brand"/>
                    <input placeholder="name"/>
                    <input placeholder="size"/>
                    <input placeholder="price"/>
                    <input type="text" placeholder="description"/>
                    <p>condition</p>
                    <select name='condition'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <button>PUBLISH</button>
                </form>
            </div>
        )
    }
}

export default Sell;