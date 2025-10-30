'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/app/page-header';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { branches as initialBranches } from '@/lib/data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

type Branch = {
  id: string;
  name: string;
};

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>(initialBranches);
  const [newBranchName, setNewBranchName] = useState('');
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddBranch = () => {
    if (newBranchName.trim() === '') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Branch name cannot be empty.',
      });
      return;
    }
    const newBranch: Branch = {
      id: newBranchName.toLowerCase().replace(/\s+/g, '-'),
      name: newBranchName,
    };
    setBranches([...branches, newBranch]);
    setNewBranchName('');
    setIsDialogOpen(false);
    toast({
      title: 'Success',
      description: `Branch "${newBranch.name}" has been added.`,
    });
  };

  const handleEditBranch = () => {
    if (!editingBranch || editingBranch.name.trim() === '') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Branch name cannot be empty.',
      });
      return;
    }
    setBranches(
      branches.map((b) => (b.id === editingBranch.id ? editingBranch : b))
    );
    setEditingBranch(null);
    setIsDialogOpen(false);
    toast({
      title: 'Success',
      description: 'Branch has been updated.',
    });
  };
  
  const handleDeleteBranch = (branchId: string) => {
    setBranches(branches.filter((b) => b.id !== branchId));
    toast({
      title: 'Success',
      description: 'Branch has been deleted.',
    });
  }

  const openEditDialog = (branch: Branch) => {
    setEditingBranch({...branch});
    setIsDialogOpen(true);
  }

  const openAddDialog = () => {
    setEditingBranch(null);
    setNewBranchName('');
    setIsDialogOpen(true);
  }

  const handleDialogSubmit = () => {
    if(editingBranch) {
      handleEditBranch();
    } else {
      handleAddBranch();
    }
  }
  
  return (
    <>
      <PageHeader
        title="Branches"
        description="Manage your restaurant's branches here."
      >
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Branch
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingBranch ? 'Edit Branch' : 'Add New Branch'}</DialogTitle>
              <DialogDescription>
                {editingBranch ? 'Update the details for this branch.' : 'Enter the details for the new branch.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="branch-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="branch-name"
                  value={editingBranch ? editingBranch.name : newBranchName}
                  onChange={(e) => {
                    if(editingBranch) {
                      setEditingBranch({...editingBranch, name: e.target.value});
                    } else {
                      setNewBranchName(e.target.value);
                    }
                  }}
                  className="col-span-3"
                  placeholder="e.g., Downtown"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                 <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleDialogSubmit}>
                {editingBranch ? 'Save Changes' : 'Add Branch'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Branch List</CardTitle>
          <CardDescription>
            A list of all branches in your organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Branch Name</TableHead>
                <TableHead>Branch ID</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell className="font-medium">{branch.name}</TableCell>
                  <TableCell>{branch.id}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(branch)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDeleteBranch(branch.id)}
                        >
                           <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
