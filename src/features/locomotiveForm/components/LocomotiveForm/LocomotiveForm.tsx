import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { Col, Form, FormInstance, Input, InputNumber, Row } from "antd";
import { FC, useEffect, useState } from "react";
import { CENTER_LAT, CENTER_LNG } from "../../../../shared/constants/map";
import { required } from "../../../../shared/helpers/form";

export type LocomotiveInitialValues = Partial<FormValues>;
export type LocomotiveFormValues = FormValues;

enum FormNames {
  NAME = 'name',
  SERIES = 'series',
  QUANTITY_SECTIONS = 'quantitySections',
  LAT = 'lat',
  LNG = 'lng',
}

interface FormValues {
  [FormNames.NAME]: string;
  [FormNames.SERIES]: string;
  [FormNames.QUANTITY_SECTIONS]: number;
  [FormNames.LAT]: number;
  [FormNames.LNG]: number;
}

interface Props {
  formInstanse: FormInstance<FormValues>;
  onSubmit: (values: LocomotiveFormValues) => void;
  initialValues?: LocomotiveInitialValues;
}

const LocomotiveForm: FC<Props> = (props) => {
  const {
    formInstanse, onSubmit, initialValues,
  } = props;
  const [coords, setCoords] = useState([CENTER_LAT, CENTER_LNG]);
  const [coordsFilled, setCoordsFilled] = useState(false);

  useEffect(() => {
    formInstanse.resetFields();
    setCoords([
      initialValues?.lat ?? CENTER_LAT,
      initialValues?.lng ?? CENTER_LNG,
    ]);
    setCoordsFilled(
      !!initialValues?.lat && !!initialValues?.lng
    );
  }, [initialValues, formInstanse]);

  const handleFormChange = () => {
    const { lat, lng } = formInstanse.getFieldsValue();
    const [oldLat, oldLng] = coords;

    if (oldLat !== lat || oldLng !== lng) {
      setCoords([lat, lng]);
      setCoordsFilled(typeof lat === 'number' && typeof lng === 'number');
    }
  }

  const handleMapClick = (e: any) => {
    const [lat, lng] = e.get('coords');
    setCoords([lat, lng]);
    setCoordsFilled(true);
    formInstanse.setFieldsValue({ lat, lng });
  }

  return (
    <>
      <Form form={formInstanse} onFieldsChange={handleFormChange} onFinish={onSubmit} layout="vertical" initialValues={initialValues}>
        <Form.Item
          label="Наименование"
          name={FormNames.NAME}
          rules={[required()]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Серия"
          name={FormNames.SERIES}
          rules={[required()]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label=" Количество секции"
          name={FormNames.QUANTITY_SECTIONS}
          rules={[required()]}
        >
          <InputNumber style={{width: '100%'}} />
        </Form.Item>
        <Row gutter={[15, 15]}>
          <Col span={12}>
            <Form.Item
              label="Широта"
              name={FormNames.LAT}
              rules={[required()]}
            >
              <InputNumber style={{width: '100%'}} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Долгота"
              name={FormNames.LNG}
              rules={[required()]}
            >
              <InputNumber style={{width: '100%'}} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <YMaps>
        <Map width={'100%'} height={200} defaultState={{ center: coords, zoom: 9 }} onClick={handleMapClick}>
          {coordsFilled ? (
            <Placemark
              key={'Placemark'}
              geometry={coords}
              options={{
                iconLayout: "default#image",
                iconImageSize: [50, 50],
              }}
            />
          ) : null}
        </Map>
      </YMaps>
    </>
  );
};

export default LocomotiveForm;