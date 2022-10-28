import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { locomotiveApi } from "../../../../entities/locomotive/api/locomotiveApi";
import { LocomotiveTable } from "../../components";
import { LocomotiveTableDataType } from "../../components/LocomotiveTable/LocomotiveTable";

const { useFetchListQuery, useDeleteMutation } = locomotiveApi;

const LocomotiveTableContainer: FC = () => {
  const navigate = useNavigate();
  const [deleteLocomotive] = useDeleteMutation();
  const { data, isLoading } = useFetchListQuery();

  const handleEdit = (id: number) => {
    navigate(`./${id}`);
  };

  const handleDelete = (id: number) => {
    deleteLocomotive(id);
  };

  const tableData: LocomotiveTableDataType[] = data?.map((locomotive) => ({
    id: locomotive.id,
    key: locomotive.id,
    name: locomotive.name,
    series: locomotive.series,
    quantitySections: locomotive.quantitySections,
    coordinates: `${locomotive.lat}: ${locomotive.lng}`,
  })) || [];

  return (
    <LocomotiveTable
      isLoading={isLoading}
      data={tableData}
      onEditBtnClick={handleEdit}
      onDeleteBtnClick={handleDelete}
    />
  );
};

export default LocomotiveTableContainer;