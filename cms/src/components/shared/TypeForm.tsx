import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";

export default function ProductTypeForm({ isOpen, onClose, data, groups, onSave }: any) {
  const [formData, setFormData] = useState({ name: "", description: "", group: "" });

  useEffect(() => {
    if (data) setFormData({ name: data.name, description: data.description || "", group: data.group?._id || "" });
    else setFormData({ name: "", description: "", group: "" });
  }, [data, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader><DialogTitle>{data ? "Edit Type" : "Add Type"}</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Group</Label>
            <Select value={formData.group} onValueChange={(v) => setFormData({ ...formData, group: v })}>
              <SelectTrigger><SelectValue placeholder="Select group" /></SelectTrigger>
              <SelectContent>
                {groups?.map((g: any) => <SelectItem key={g._id} value={g._id}>{g.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onSave(formData)} className="cursor-pointer">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}