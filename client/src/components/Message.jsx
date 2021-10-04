const Message = ({ error, signveritent }) => {
  return (
    <>
      <div className="col-auto m-auto mt-2">
        <div
          className={`alert alert-dismissible fade ${signveritent} show`}
          role="alert"
        >
          <strong> {error}</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </>
  );
};
Message.defaultProps = {
  signveritent: "alert-info"
};

export default Message;
