import React,{useCallback} from 'react'

export const useFirstStep = ({
    addData,
    data,
    setExternalError,
    fieldErrors
} : any) => {

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
    
          
    
          //When we update it is not instant
    
          addData(name, value);
        },
        []
      );
    
      const handleInputBlur = useCallback(
        (inputName: string) => {
          const validateEmail = () => {
            if (data.email === "") {
              setExternalError("email", "Email is mandatory");
    
              return;
            }
    
            setExternalError("email", "");
          };
          const validateName = () => {
            if (data.name === "") {
              setExternalError("name", "Name is mandatory");
    
              return;
            }
            setExternalError("name", "");
          };
          const validateSurname = () => {
            if (data.surname1 === "") {
              setExternalError("surname1", "Surname 1 is mandatory");
    
              return;
            }
            setExternalError("surname1", "");
          };
          const validateBirthDate = () => {
            if (data.birthdate === "") {
              setExternalError("birthdate", "Birth date is mandatory");
    
              return;
            }
            setExternalError("birthdate", "");
          };
          const validateGender = () => {
            if (data.gender === "") {
              setExternalError("gender", "Gender is mandatory");
    
              return;
            }
            setExternalError("gender", "");
          };
          const validatePhone = () => {
            if (data.mobile === "") {
              setExternalError("mobile", "Mobile phone number is mandatory");
    
              return;
            }
            setExternalError("mobile", "");
          };
    
          if (inputName === "email") {
            validateEmail();
          }
          if (inputName === "name") {
            validateName();
          }
          if (inputName === "surname1") {
            validateSurname();
          }
          if (inputName === "birthdate") {
            validateBirthDate();
          }
          if (inputName === "gender") {
            validateGender();
          }
          if (inputName === "mobile") {
            validatePhone();
          }
        },
        [data]
      );
    
      
    
      const handleInputFocus = useCallback(
        (inputName: string) => {
          setExternalError(inputName, "");
        },
        [fieldErrors]
      );



      return {
        handleInputBlur,
        handleInputChange,
        handleInputFocus
      }
    
}