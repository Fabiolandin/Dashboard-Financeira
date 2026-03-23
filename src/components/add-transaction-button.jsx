import { Loader2Icon, PiggyBankIcon, PlusIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Button } from "./ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,

} from '@/components/ui/dialog'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { NumericFormat } from "react-number-format";
import { DatePicker } from "./ui/date-picker";

import { useState } from "react";
import { useCreateTransactionForm } from "@/forms/hooks/transaction";
import { toast } from "sonner";



const AddTransactionButton = () => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false)
    const {form, onSubmit} = useCreateTransactionForm({
        onSuccess: () => {
            setDialogIsOpen(false)
            toast.success('Transação criada com sucesso!')
        },
        onError: () => {
            toast.error(
                'Ocorreu um erro ao criar a transação.'
            )
        }
    })

    return (<div>
        <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon />
                    Nova Transação
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nova transação</DialogTitle>
                    <DialogDescription>Insira as informações abaixo.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Digite o nome da transação" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valor</FormLabel>
                                    <FormControl>
                                        {/* biblio para formatação de valor monetario para input */}
                                        <NumericFormat placeholder="Digite o valor da transação"
                                            thousandSeparator="."
                                            decimalSeparator=","
                                            prefix="R$"
                                            allowNegative={false}
                                            customInput={Input}
                                            {...field}
                                            onChange={() => { }}
                                            onValueChange={(values) => field.onChange(values.floatValue)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data</FormLabel>
                                    <FormControl>
                                        <DatePicker {...field} placeholder="Selecione a data da transação" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo</FormLabel>
                                    <FormControl>
                                        <div className="grid grid-cols-3 gap-4">
                                            <Button
                                                type="button"
                                                variant={
                                                    field.value == 'EARNING' ? 'secondary' : 'outline'}
                                                onClick={() => field.onChange('EARNING')}>
                                                <TrendingUpIcon className="text-primary-green" />
                                                Ganho
                                            </Button>
                                            <Button type="button" variant={
                                                field.value == 'EXPENSE' ? 'secondary' : 'outline'}
                                                onClick={() => field.onChange('EXPENSE')}>
                                                <TrendingDownIcon className="text-primary-red" />
                                                Gasto
                                            </Button>
                                            <Button type="button" variant={
                                                field.value == 'INVESTMENT' ? 'secondary' : 'outline'}
                                                onClick={() => field.onChange('INVESTMENT')}>
                                                <PiggyBankIcon className="text-primary-blue" />
                                                Investimento
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="">
                            <DialogClose asChild>
                                <Button type="reset" variant="secondary" className="w-full" disable={form.formState.isSubmitting}>
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button type="submit" className="w-full" disable={form.formState.isSubmitting}>
                                {form.formState.isSubmitting && <Loader2Icon className="animate-spin"/>}
                                Adicionar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    </div>

    )
}

export default AddTransactionButton;