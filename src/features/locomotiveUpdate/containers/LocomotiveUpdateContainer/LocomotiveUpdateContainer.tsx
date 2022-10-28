import { Form, Spin } from "antd";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { locomotiveApi } from "../../../../entities/locomotive/api/locomotiveApi";
import { RouteModal } from "../../../../shared/components";
import { LocomotiveForm } from "../../../locomotiveForm/components";
import { LocomotiveFormValues } from "../../../locomotiveForm/components/LocomotiveForm/LocomotiveForm";

const { useFetchQuery, useUpdateMutation } = locomotiveApi;

type Params = 'locomotiveId';

const LocomotiveUpdateContainer: FC = () => {
  const { locomotiveId } = useParams<Params>();
  const { data, isLoading, error} = useFetchQuery(locomotiveId ? +locomotiveId : -1);
  const [ updateLocomotive ] = useUpdateMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  

  if (locomotiveId && +locomotiveId) {
    const handleOkClick = () => {
      form.submit();
    };

    const handleSubmit = (values: LocomotiveFormValues) => {
      updateLocomotive({
        id: + locomotiveId,
        formValues: values,
      }).then(() => navigate(-1));
    };
    
    return (
      <RouteModal 
        title={'Редактировать локомотив'}
        okText={'Сохранить'}
        cancelText={'Отмена'}
        onOk={handleOkClick}
      >
        <Spin spinning={isLoading}>
          <LocomotiveForm
            formInstanse={form}
            onSubmit={handleSubmit}
            initialValues={data}
          />
        </Spin>
      </RouteModal>
    );
  }
  
  return (
    <div>Ошибка</div>
  );
};

export default LocomotiveUpdateContainer;