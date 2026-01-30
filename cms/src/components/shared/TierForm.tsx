"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Switch } from "../ui/switch";

export default function TierForm({ isOpen, onClose, data, onSave }: any) {
    const [formData, setFormData] = useState({ name: "", description: "", isActive: true });

    useEffect(() => {
        if (data) setFormData({ name: data.name, description: data.description || "", isActive: data.isActive });
        else setFormData({ name: "", description: "", isActive: false });
    }, [data, isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader><DialogTitle>{data ? "Edit Tier" : "Add Tier"}</DialogTitle></DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Tier Name</Label>
                        <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Gold" />
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <div className="space-y-2">
                            <Label>Is Active</Label>
                            <Switch
                                checked={formData.isActive}
                                onCheckedChange={(value) =>
                                    setFormData({ ...formData, isActive: value })
                                }
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => onSave(formData)} className="w-full sm:w-auto cursor-pointer">Save Group</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}