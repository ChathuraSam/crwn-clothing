import './form-input.styles.scss'


const FormInput = ({ lable, ...otherProps }) => {

  return (
    <div className="group">
      <input {...otherProps} className="form-input" />
      {lable && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-lable`}
        >
          {lable}
        </label>
      )}
    </div>
  );
};

export default FormInput;
