const HelpItem = ({ icon, title, children }) => {
  return (
    <div className="my-6">
      <div className="flex justify-center">
        <h2>
          <span className="inline text-xl">
            <img
              src={icon}
              className="inline"
              title={title}
              alt={title}
              height="auto"
              width="50px"
            />
            {title}
          </span>
        </h2>
      </div>
      <div>
        <p className="text-base">{children}</p>
      </div>
    </div>
  );
};

export default HelpItem;
