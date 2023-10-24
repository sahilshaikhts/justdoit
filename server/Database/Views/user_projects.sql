create VIEW jdi.user_projects as
select projects.id,projects.name,
    jdi.jt_users_projects.user_role
from projects
    join jdi.jt_users_projects on jdi.projects.id = jdi.jt_users_projects.project_id
where jdi.jt_users_projects.user_id = ?


--@block
create view test 