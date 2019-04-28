import React, { Component } from "react";

class CardPrice extends Component {
  render() {
    return (
      <div className="col-xl-3 col-md-6 mb-4">
        <div className={`card border-left-${this.props.color} shadow h-100 py-2`}>
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div
                  className={`text-xs font-weight-bold text-${this.props.color} text-uppercase mb-1`}>
                  {this.props.name}
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {this.props.value}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardPrice;
