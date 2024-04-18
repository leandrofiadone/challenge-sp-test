import React from "react"

interface NotificationProps {
  message: string
  onClose: () => void
}

const Notification: React.FC<NotificationProps> = ({message, onClose}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default Notification
