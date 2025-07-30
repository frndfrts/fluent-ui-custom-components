/**
 * commonStyles.ts
 * Centralized style patterns for consistent UI across components.
 */
import { makeStyles } from '@fluentui/react-components';

export const useCommonStyles = makeStyles({
  // Container patterns
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px', // Reduced gap for tighter integration
  },
  
  // Label patterns
  label: {
    textAlign: 'right',
    fontWeight: 'normal',
    color: 'var(--colorNeutralForeground1)',
    fontSize: 'inherit',
    lineHeight: '1.5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  labelSmall: {
    width: '120px',
  },
  labelMedium: {
    width: '160px',
  },
  labelLarge: {
    width: '200px',
  },
  
  // Input patterns
  input: {
    flex: 1,
  },
  inputField: {
    textAlign: 'right',
    paddingRight: '28px', // Make room for stepper buttons with balanced gap
  },
  
  // Select patterns
  select: {
    flex: 1,
  },
  
  // Panel patterns
  panel: {
    display: 'grid',
    rowGap: 'var(--spacingVerticalM)',
    paddingTop: 'var(--spacingVerticalM)',
  },
  section: {
    display: 'grid',
    rowGap: 'var(--spacingVerticalS)',
  },
  sectionTitle: {
    marginBottom: 'var(--spacingVerticalXS)',
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--colorNeutralStroke2)',
    margin: 'var(--spacingVerticalM) 0',
  },
  
  // Group patterns
  group: {
    display: 'grid',
    rowGap: 'var(--spacingVerticalS)',
  },
  
  // Stepper patterns
  stepperContainer: {
    position: 'absolute',
    right: '1px',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    pointerEvents: 'none', // Allow clicks to pass through to input
    opacity: '0',
    transition: 'opacity 0.15s ease-in-out',
  },
  stepperButton: {
    height: '12px',
    minHeight: '12px',
    padding: '0',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '8px',
    color: 'var(--colorNeutralForeground3)',
    pointerEvents: 'auto', // Re-enable pointer events for buttons
    borderRadius: '2px',
    '&:hover': {
      color: 'var(--colorNeutralForeground1)',
      backgroundColor: 'var(--colorNeutralBackground3)',
    },
  },
  
  // Radio group patterns
  radioGroup: {
    display: 'flex',
    gap: '8px',
  },
  
  // Checkbox patterns
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 'var(--spacingVerticalS)',
    paddingLeft: '160px', // Align with the numeric input fields (label width)
  },
  checkbox: {
    margin: 0,
  },
}); 