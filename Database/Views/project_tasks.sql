create VIEW project_tasks as
select project_tasks.userid,
    project_tasks.title,
    project_tasks.priority,
    project_tasks.progress
from project_tasks
where project_tasks.projectid = ?