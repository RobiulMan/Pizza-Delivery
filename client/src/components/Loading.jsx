const Loading = () => {
  return (
    <div
      className="spinner-border text-warning"
      role="status"
      style={{
        width: "100px",
        height: "100px",
        margin: "0px auto",
        display: "block"
      }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};
export default Loading;
