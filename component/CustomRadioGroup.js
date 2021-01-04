import React from "react";
import PropTypes from "prop-types";
import PatchEvent, { set } from "part:@sanity/form-builder/patch-event";

const createPatchFrom = (value) => {
  return PatchEvent.from(value === "true" ? set("true") : set("false"));
};

export default class Slider extends React.Component {
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string,
      options: PropTypes.shape({
        list: PropTypes.object,
        name: PropTypes.string,
      }).isRequired,
    }).isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { value, onChange } = this.props;

    if (value === undefined) {
      onChange(createPatchFrom(false));
    }
  }

  // this is called by the form builder whenever this input should receive focus

  render() {
    const { type, value, onChange } = this.props;

    return (
      <div>
        <div
          style={{
            display: "inline-block",
            marginRight: "21px",
          }}
          className="DefaultLabel_root_1vtRm DefaultFormField_label_1lrxP DefaultLabel_level_1_1NA0j forms_headingLevel_1_20wsC"
        >
          {type.title} ?
        </div>

        {type.options.list.map((field) => (
          <div
            style={{
              display: "inline-block",
              marginLeft: "10px",
            }}
          >
            <input
              type="radio"
              name={type.options.name}
              checked={value === field.value}
              value={field.value}
              onChange={(event) => {
                event.persist();
                onChange(createPatchFrom(event.target.value));
                javascript();
              }}
            />
            &nbsp;
            {field.title}
            &nbsp;
          </div>
        ))}
      </div>
    );
  }
}
