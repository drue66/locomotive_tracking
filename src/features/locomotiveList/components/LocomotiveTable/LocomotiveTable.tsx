import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Modal, Typography } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { FC, useMemo } from "react";

const { confirm } = Modal;
const { Text } = Typography;

export type LocomotiveTableDataType = DataType;

enum ColumnName {
  ID = 'id',
  KEY = 'key',
  NAME = 'name',
  SERIES = 'series',
  QUANTITY_SECTIONS = 'quantitySections',
  COORDINATES = 'coordinates',
  ACTIONS = 'actions',
}

interface DataType {
  [ColumnName.ID]: number,
  [ColumnName.NAME]: string,
  [ColumnName.SERIES]: string,
  [ColumnName.QUANTITY_SECTIONS]: number,
  [ColumnName.COORDINATES]: string,
}

interface Props {
  data: DataType[];
  isLoading: boolean;
  onEditBtnClick: (id: number) => void;
  onDeleteBtnClick: (id: number) => void;
}

const LocomotiveTable: FC<Props> = (props) => {
  const { data, isLoading, onEditBtnClick, onDeleteBtnClick } = props;

  const handleDelete = (id: number, name: string) => {
    confirm({
      title: 'Удаление локомотива',
      icon: <DeleteOutlined />,
      content: <>Вы уверены что хотите удалить локомотив <Text strong>{name}</Text>?</>,
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk() {
        onDeleteBtnClick(id);
      },
    });
  };

  const renderActionMenu = (record: DataType) => (
    <Menu
      items={[
        {
          label: 'Редактировать',
          key: 'edit',
          icon: <EditOutlined />,
          onClick: () => onEditBtnClick(record.id),
        },
        {
          label: 'Удалить',
          key: 'delete',
          icon: <DeleteOutlined />,
          danger: true,
          onClick: () => handleDelete(record.id, record.name),
        },
      ]}
    />
  );

  const columns: ColumnsType<DataType> = useMemo(() => [
    {
      title: 'Наименование',
      dataIndex: ColumnName.NAME,
      key: ColumnName.NAME,
    },
    {
      title: 'Серия',
      dataIndex: ColumnName.SERIES,
      key: ColumnName.SERIES,
    },
    {
      title: 'Количество секции',
      dataIndex: ColumnName.QUANTITY_SECTIONS,
      key: ColumnName.QUANTITY_SECTIONS,
    },
    {
      title: 'Координаты',
      dataIndex: ColumnName.COORDINATES,
      key: ColumnName.COORDINATES,
    },
    {
      dataIndex: ColumnName.ACTIONS,
      key: ColumnName.ACTIONS,
      render: (_, record) => (
        <Dropdown overlay={renderActionMenu(record)} trigger={['click']}>
          <Button icon={<EditOutlined />} />
        </Dropdown>
      ),
    },
  ], []);

  return (
    <Table loading={isLoading} dataSource={data} columns={columns} pagination={false} />
  );
};

export default LocomotiveTable;