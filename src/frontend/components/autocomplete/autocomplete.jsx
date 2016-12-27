import React from 'react';

class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this._initializeAutoComplete = this._initializeAutoComplete.bind(this);
    this._fillInAddress = this._fillInAddress.bind(this);
    this._geolocate = this._geolocate.bind(this);
  }

  componentDidMount() {
    this._initializeAutoComplete();
  }

  _initializeAutoComplete() {
    let autocompleteNode = this.refs.autocomplete;
    this.autoComplete = new google.maps.places.Autocomplete(autocompleteNode,{types:['geocode']});
    this.autoComplete.addListener('place_changed', this._fillInAddress);
  }

  _fillInAddress() {
    let place = this.autoComplete.getPlace(),
        componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      };

    for (let component in componentForm) {
          document.getElementById(component).value = '';
          document.getElementById(component).disabled = false;
        }

    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        document.getElementById(addressType).value = val;
      }
    }
  }

  _geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        let circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        this.autoComplete.setBounds(circle.getBounds());
      });
    }
  }

  render() {
    return(
      <div>
        <div id="locationField">
          <input id="autocomplete"
                 ref="autocomplete"
                 placeholder="Enter your address"
                 onFocus={this._gelocate}
                 type="text">
          </input>
        </div>

        <table id="address">
          <tbody>
            <tr>
              <td className="label">Street address</td>
              <td className="slimField">
                <input className="field"
                       id="street_number"
                       disabled="true">
                </input>
              </td>
              <td className="wideField" colSpan="2">
                <input className="field"
                       id="route"
                       disabled="true">
                </input>
              </td>
            </tr>
            <tr>
              <td className="label">City</td>
              <td className="wideField" colSpan="3">
                <input className="field"
                       id="locality"
                       disabled="true">
                </input>
              </td>
            </tr>
            <tr>
              <td className="label">State</td>
              <td className="slimField">
                <input className="field"
                       id="administrative_area_level_1"
                       disabled="true">
                </input>
              </td>
              <td className="label">Zip code</td>
              <td className="wideField">
                <input className="field"
                       id="postal_code"
                       disabled="true">
                </input>
              </td>
            </tr>
            <tr>
              <td className="label">Country</td>
              <td className="wideField" colSpan="3">
                <input className="field"
                       id="country"
                       disabled="true">
                </input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    );
  }
}

export default AutoComplete;
