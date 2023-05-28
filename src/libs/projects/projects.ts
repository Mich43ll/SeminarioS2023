export interface IProject{
    _id?: string;
    name: string;
    description: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

//const newPrject: Required<IProject>={}; hace que cada uno de los campos de Iproject sean requeridos
const memoryProjects: IProject[] = [];
let createdProjects = 0;

export const createProject = async (project: IProject) => {
    const newProject = {...project};
    newProject._id = (++createdProjects).toString();
    newProject.createdAt = new Date();
    newProject.updatedAt = newProject.createdAt;
    memoryProjects.push(newProject);
    return newProject;
}

export const getProjects = async() => {
    return memoryProjects;
};



export const updateProject = ( id:string, project:Partial<IProject>) => { //partial hace que todos los atributos sean opcionales

    const index = memoryProjects.findIndex(p => p._id === id);
    if (index === -1) throw new Error('Project not found');

    memoryProjects[index] = { ...memoryProjects[index], ...project, updatedAt: new Date() };
    return memoryProjects[index];
  }
  
  export const deleteProject = (id:string) => {
    const index = memoryProjects.findIndex(p => p._id === id);
    if (index === -1) throw new Error('Project not found');
    memoryProjects.splice(index, 1);
    return true;
  }