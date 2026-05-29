# Plan Supabase V1

Objectif: remplacer la sauvegarde locale par une vraie base multi-entreprise.

## Tables principales

- tenants
- tenant_members
- user_profiles
- companies
- clients
- workers
- subcontractors
- job_sites
- punch_sessions
- breaks
- estimates
- contracts
- invoices
- invoice_lines
- catalog_items
- expenses
- rewards
- settings

## Regle multi-entreprise

Chaque table metier doit avoir:

- tenant_id
- created_by
- created_at
- updated_at

Aucune ligne ne doit etre lue par un utilisateur qui n'est pas membre du tenant.

## Roles

- owner
- admin
- foreman
- employee
- subcontractor
- accounting

## Securite

- RLS obligatoire.
- Donnees sensibles separees.
- Acces limite par role.
- Storage separe par tenant.
- Audit minimal pour modifications importantes.

## Migration progressive

1. Garder localStorage comme mode demo.
2. Ajouter Supabase client.
3. Ajouter auth.
4. Ajouter tenants.
5. Migrer module par module.
