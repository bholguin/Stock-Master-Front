import { observer } from 'mobx-react';
import { FC, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IVehiculo } from 'services/vehiculos';
import { Styled } from '../styles';
import { InputTextForm } from 'components/InputText';
import { ButtonApp } from 'components/Button/Button';
import { UpdateVehiculoStore } from './update-vehiculo-store';

type Props = {
  store: UpdateVehiculoStore;
};

export const UpdateVehiculo: FC<Props> = observer((props) => {
  const { store } = props;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<IVehiculo>({
    mode: 'onChange',
    defaultValues: {
      descripcion: '',
      placa: '',
      marca: '',
      modelo: '',
    },
  });

  const submit = useCallback(
    (data: IVehiculo) => {
      store.putVehiculo.run(data);
    },
    [store.putVehiculo]
  );

  useEffect(() => {
    store.getVehiculo.run();
  }, [store.getVehiculo]);

  useEffect(() => {
    console.log(store.vehiculo);

    reset(store.vehiculo);
  }, [store.vehiculo, reset]);

  return (
    <Styled.DialogStyled open={store.show.isVisible}>
      <Styled.Form onSubmit={handleSubmit(submit)}>
        <Styled.DialogTitleStyled>
          Editar Vehiculo
          <Styled.CloseIconStyled onClick={store.goBack} />
        </Styled.DialogTitleStyled>
        <Styled.DialogContentStyled>
          <InputTextForm
            control={control}
            name="placa"
            inputProps={{
              label: 'Placa',
              fullWidth: true,
            }}
            rules={{
              required: 'Campo requerido',
            }}
          />
          <InputTextForm
            control={control}
            name="marca"
            inputProps={{
              label: 'Marca',
              fullWidth: true,
            }}
          />
          <InputTextForm
            control={control}
            name="fecha_tecno"
            inputProps={{
              label: 'Fecha de tecnomecanica',
              fullWidth: true,
              type: 'date',
            }}
          />
          <InputTextForm
            control={control}
            name="fecha_seguro"
            inputProps={{
              label: 'Fecha de SOAT',
              fullWidth: true,
              type: 'date',
            }}
          />
          <InputTextForm
            control={control}
            name="modelo"
            inputProps={{
              label: 'Modelo',
              fullWidth: true,
            }}
          />
          <InputTextForm
            control={control}
            name="descripcion"
            inputProps={{
              label: 'Descripcion',
              fullWidth: true,
              multiline: true,
              rows: 4,
            }}
          />
        </Styled.DialogContentStyled>
        <Styled.DialogActionsStyled>
          <ButtonApp variant="contained" disabled={!isValid} type="submit">
            Guardar
          </ButtonApp>
          <ButtonApp onClick={store.goBack}>Cancelar</ButtonApp>
        </Styled.DialogActionsStyled>
      </Styled.Form>
    </Styled.DialogStyled>
  );
});
