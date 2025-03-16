/* eslint-disable @typescript-eslint/no-explicit-any */
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export const useZodForm = (
    schema: ZodSchema,
    mutation: UseMutateFunction,
    defaultValues?: any,
) => {
    const { 
    formState: { errors },
    handleSubmit, 
    register,
    reset,
    watch,
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            ...defaultValues,
        },
    });

    const onFormSubmit = handleSubmit(async (values) => mutation(values));
    return {
        errors,
        onFormSubmit,
        register,
        reset,
        watch,
    };
};