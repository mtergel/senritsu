import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
const RecForm: React.FC = () => {
  const { register, handleSubmit, errors, formState } = useForm();
  const onSubmit = (formData) => {
    alert(JSON.stringify(formData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="energy">Relaxed - Energetic</FormLabel>
        <Slider
          aria-label="slider-ex-2"
          colorScheme="pink"
          defaultValue={0.5}
          name="name"
          aria-labelledby="energy"
          min={0}
          max={1}
          step={0.1}
          ref={register}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="danceability">Shy - Friendly</FormLabel>
        <Slider
          aria-label="slider-ex-2"
          colorScheme="pink"
          defaultValue={0.5}
          name="danceability"
          aria-labelledby="danceability"
          min={0}
          max={1}
          step={0.1}
          ref={register}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="instrumentalness">Apathetic - Curious</FormLabel>
        <Slider
          aria-label="slider-ex-2"
          colorScheme="pink"
          defaultValue={0.5}
          name="instrumentalness"
          aria-labelledby="instrumentalness"
          min={0}
          max={1}
          step={0.1}
          ref={register}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        mt={4}
        colorScheme="teal"
        isLoading={formState.isSubmitting}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default RecForm;
