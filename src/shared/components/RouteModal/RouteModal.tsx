import { Modal, ModalProps } from "antd";
import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props extends ModalProps {}

const RouteModal: FC<Props> = (props) => {
  const { children, ...modalProps} = props;
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Modal {...modalProps} visible onCancel={handleBack}>
      {children}
    </Modal>
  );
};

export default RouteModal;