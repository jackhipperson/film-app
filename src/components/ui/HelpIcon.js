const HelpIcon = ({icon, title}) => {
    return (
        <img
        className="inline"
        src={icon}
        alt={title}
        title={title}
        width="20"
        height="auto"
      />
    )
}

export default HelpIcon