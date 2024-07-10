import React from "react"

interface helpIconProps {
  icon:string,
  title:string
}

const HelpIcon: React.FC<helpIconProps> = ({icon, title}) => {
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