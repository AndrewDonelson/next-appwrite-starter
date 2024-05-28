import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Page() {

  async function createInvoice(formData: FormData) {
    "use server";
    console.log("Submitted with", formData.get("customerId"), formData.get("amount"), formData.get("status"));

    // mutate data
    // revalidate cache
  }

  return (
    <form action={createInvoice}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Create Invoice</CardTitle>
          <CardDescription>
            Enter example invoice data below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input name="customerId" type="text" placeholder="customerId" />
          <Input name="amount" type="text" placeholder="amount" />
          <Input name="status" type="text" placeholder="status" />
          <button type="submit">Create Invoice</button>
        </CardContent>
      </Card>
    </form>
  );
}