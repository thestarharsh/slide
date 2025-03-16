"use client";

import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { z } from "zod";

import { createAutomations, deleteKeyword, saveKeyword, saveListener, saveTrigger, updateAutomationName } from "@/actions/automations";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { TRIGGER } from "@/redux/slices/automation";

import { useMutationData } from "./use-mutation-data";
import { useZodForm } from "./use-zod-form";

export const useCreateAutomation = (id?: string) => {
    const { isPending, mutate } = useMutationData(
        ["create-automation"],
        () => createAutomations(id),
        "user-automations"
    );

    return { isPending, mutate };
};

export const useEditAutomation = (id: string) => {
    const [edit, setEdit] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const enableEdit = () => setEdit(true);
    const disableEdit = () => setEdit(false);

    const { isPending, mutate } = useMutationData(
        ["update-automation"],
        (data: { name: string }) => updateAutomationName(id, { name: data.name }),
        "automation-info",
        disableEdit,
    );

    useEffect(() => {
        function handleClickOutside(this: Document, event: MouseEvent) {
            if (inputRef.current && !inputRef.current.contains(event.target as Node | null)) {
                if (inputRef.current.value !== "") {
                    mutate({ name: inputRef.current.value });
                } else {
                    disableEdit();
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [mutate]);

    return { isPending, edit, inputRef, enableEdit, disableEdit };
};

export const useListener = (id: string) => {
    const [listener, setListener] = useState<"MESSAGE" | "SMARTAI" | null>(null);
    const promptSchema = z.object({
        prompt: z.string().min(1),
        reply: z.string(),
    });

    const { isPending, mutate } = useMutationData(["create-listener"], (data: { prompt: string; reply: string }) =>
        saveListener(id, listener || "MESSAGE", data.prompt, data.reply), "automation-info");

    const {
        errors,
        onFormSubmit,
        register,
        reset,
        watch,
    } = useZodForm(
        promptSchema,
        mutate,
    );

    const onSetListener = (type: "MESSAGE" | "SMARTAI") => setListener(type);
    
    return {
        errors,
        isPending,
        listener,
        onFormSubmit,
        onSetListener,
        register,
        reset,
        watch,
    };
};


export const useTriggers = (id: string) => {
    const types = useAppSelector((state) => state.AutomationReducer.trigger?.types);

    const dispatch: AppDispatch = useDispatch();

    const onSetTrigger = (type: "COMMENT" | "DM") => dispatch(TRIGGER({trigger: { type }}));

    const { isPending, mutate } = useMutationData(
        ["add-trigger"],
        (data: { types: string[] }) => saveTrigger(id, data.types),
        "automation-info",
    );

    const onSaveTrigger = () => mutate({ types });

    return {
        isPending,
        onSaveTrigger,
        onSetTrigger,
        types,
    };
};

export const useKeywords = (id: string) => {
    const [keyword, setKeyword] = useState("");
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value);

    const { mutate } = useMutationData(
        ["add-keyword"],
        (data: { keyword: string }) => saveKeyword(id, data.keyword),
        "automation-info",
        () => setKeyword(""),
    )
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            mutate({ keyword });
            setKeyword("");
        }
    }

    const { mutate: deleteMutation } = useMutationData(
        ["delete-keyword"],
        (data: { id: string }) => deleteKeyword(data.id),
        "automation-info",
    );

    return {
        deleteMutation,
        keyword,
        onKeyPress,
        onValueChange,
    };
};