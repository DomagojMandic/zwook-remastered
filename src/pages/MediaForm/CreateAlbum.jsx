import { useForm, Controller } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

import FormBase from "../../features/MediaForms/FormBase";
import FormInput from "../../ui/SimpleComponents/FormInput";
import FormLabel from "../../ui/SimpleComponents/FormLabel";
import FormTextarea from "../../ui/SimpleComponents/FormTextarea";
import EntitySelect from "../../ui/SimpleComponents/FormSelect";

import {
  StyledDatePicker,
  StyledCalendarWrapper,
} from "../../ui/DatePicker/StyledDatePicker";

import useArtists from "../../hooks/useArtists";

function CreateAlbum() {
  const { data: artists } = useArtists();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormBase onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FormLabel htmlFor="albumTitle">Album Title</FormLabel>
        <FormInput
          id="albumTitle"
          {...register("albumTitle")}
          placeholder="Enter album title"
        />

        {/* Controller for React DatePicker component */}
        <Controller
          control={control}
          name="releaseDate"
          defaultValue={null}
          render={({ field }) => (
            <>
              <FormLabel htmlFor="releaseDate">Release Date</FormLabel>
              <StyledCalendarWrapper>
                <StyledDatePicker
                  id="releaseDate"
                  dateFormat="yyyy-MM-dd"
                  showYearDropdown
                  scrollableYearDropdown
                  selected={field.value}
                  onChange={field.onChange}
                  minDate={new Date("1900-01-01")}
                  maxDate={new Date()}
                  yearDropdownItemNumber={75}
                  placeholderText="YYYY-MM-DD"
                />
              </StyledCalendarWrapper>
            </>
          )}
        />
        {/* Controller for React-Select Component */}
        <Controller
          control={control}
          name="artistId"
          defaultValue={null}
          render={({ field }) => (
            <>
              <FormLabel htmlFor="artistId">Artist</FormLabel>
              <EntitySelect
                items={artists || []}
                value={field.value}
                onChange={field.onChange}
              />
            </>
          )}
        />
        <FormLabel htmlFor="description">Description</FormLabel>
        <FormTextarea
          id="description"
          {...register("description")}
          placeholder="Enter album description"
        />
      </div>
    </FormBase>
  );
}

export default CreateAlbum;
