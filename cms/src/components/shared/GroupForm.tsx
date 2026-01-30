"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

export default function ProductGroupForm({ isOpen, onClose, data, onSave }: any) {
  const [formData, setFormData] = useState({ name: "", description: "" });

  useEffect(() => {
    if (data) setFormData({ name: data.name, description: data.description || "" });
    else setFormData({ name: "", description: "" });
  }, [data, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader><DialogTitle>{data ? "Edit Group" : "Add Group"}</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Group Name</Label>
            <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Activities" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onSave(formData)} className="w-full sm:w-auto cursor-pointer">Save Group</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}