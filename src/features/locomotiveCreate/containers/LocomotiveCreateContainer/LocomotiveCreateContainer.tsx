import { Form } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { locomotiveApi } from "../../../../entities/locomotive/api/locomotiveApi";
import { RouteModal } from "../../../../shared/components";
import { LocomotiveForm } from "../../../locomotiveForm/components";
import { LocomotiveFormValues } from "../../../locomotiveForm/components/LocomotiveForm/LocomotiveForm";

const { useCreateMutation } = locomotiveApi;

const LocomotiveCreateContainer: FC = () => {
  const [form] = Form.useForm();
  const [createLocomotive] = useCreateMutation();
  const navigate = useNavigate();

  const handleOkClick = () => {
    form.submit();
  };

  const handleSubmit = (values: LocomotiveFormValues) => {
    createLocomotive(values).then(() => navigate(-1));
  };
  
  return (
    <RouteModal 
      title={'Добавить локомотив'}
      okText={'Добавить'}
      cancelText={'Отмена'}
      onOk={handleOkClick}
    >
      <LocomotiveForm
        formInstanse={form}
        onSubmit={handleSubmit}
      />
    </RouteModal>
  );
};

export default LocomotiveCreateContainer;