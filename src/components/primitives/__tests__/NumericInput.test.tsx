import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NumericInput } from '../NumericInput';
import { mockOnError, mockOnChange, resetMocks } from '../../../test-utils';

describe('NumericInput', () => {
  beforeEach(() => {
    resetMocks();
  });

  const defaultProps = {
    value: 100,
    onChange: mockOnChange,
    onError: mockOnError,
  };

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<NumericInput {...defaultProps} />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue('100');
    });

    it('renders with custom size', () => {
      render(<NumericInput {...defaultProps} size="large" />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toBeInTheDocument();
    });

    it('renders with custom width', () => {
      render(<NumericInput {...defaultProps} width={200} />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<NumericInput {...defaultProps} placeholder="Enter value" />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('placeholder', 'Enter value');
    });

    it('renders disabled state', () => {
      render(<NumericInput {...defaultProps} disabled={true} />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toBeDisabled();
    });
  });

  describe('Value Handling', () => {
    it('handles empty value', () => {
      render(<NumericInput {...defaultProps} value="" />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveValue('');
    });

    it('handles zero value', () => {
      render(<NumericInput {...defaultProps} value={0} />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveValue('0');
    });

    it('handles negative values', () => {
      render(<NumericInput {...defaultProps} value={-50} />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveValue('-50');
    });

    it('handles decimal values', () => {
      render(<NumericInput {...defaultProps} value={3.14} decimalPlaces={2} />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveValue('3.14');
    });
  });

  describe('Input Validation', () => {
    it('validates numeric input', async () => {
      const user = userEvent.setup();
      render(<NumericInput {...defaultProps} />);
      
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, 'abc');
      
      // Should not call onChange with invalid input
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('validates minimum value', async () => {
      const user = userEvent.setup();
      render(<NumericInput {...defaultProps} min={0} />);
      
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '-10');
      
      // Should not call onChange with value below minimum
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('validates maximum value', async () => {
      const user = userEvent.setup();
      render(<NumericInput {...defaultProps} max={1000} />);
      
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '2000');
      
      // Should not call onChange with value above maximum
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('enforces non-negative constraint', async () => {
      const user = userEvent.setup();
      render(<NumericInput {...defaultProps} nonNegative={true} />);
      
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '-5');
      
      // Should not call onChange with negative value
      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });

  describe('User Interactions', () => {
    it('handles direct input changes', async () => {
      const user = userEvent.setup();
      render(<NumericInput {...defaultProps} />);
      
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '250');
      
      expect(mockOnChange).toHaveBeenCalledWith(250);
    });

    it('handles step up button click', async () => {
      const user = userEvent.setup();
      render(<NumericInput {...defaultProps} step={10} />);
      
      const stepUpButton = screen.getByLabelText('Increase value by 10');
      await user.click(stepUpButton);
      
      expect(mockOnChange).toHaveBeenCalledWith(110);
    });

    it('handles step down button click', async () => {
      const user = userEvent.setup();
      render(<NumericInput {...defaultProps} step={10} />);
      
      const stepDownButton = screen.getByLabelText('Decrease value by 10');
      await user.click(stepDownButton);
      
      expect(mockOnChange).toHaveBeenCalledWith(90);
    });

    it('handles keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<NumericInput {...defaultProps} step={5} />);
      
      const input = screen.getByRole('spinbutton');
      await user.click(input);
      await user.keyboard('{ArrowUp}');
      
      expect(mockOnChange).toHaveBeenCalledWith(105);
    });

    it('handles Enter key to commit changes', async () => {
      const user = userEvent.setup();
      render(<NumericInput {...defaultProps} />);
      
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '500');
      await user.keyboard('{Enter}');
      
      expect(mockOnChange).toHaveBeenCalledWith(500);
    });

    it('handles Escape key to cancel changes', async () => {
      const user = userEvent.setup();
      render(<NumericInput {...defaultProps} />);
      
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '500');
      await user.keyboard('{Escape}');
      
      // Should revert to original value
      expect(input).toHaveValue('100');
    });
  });

  describe('Error Handling', () => {
    it('calls onError when validation fails', async () => {
      const user = userEvent.setup();
      render(<NumericInput {...defaultProps} min={0} />);
      
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '-10');
      
      // Should call onError for validation failure
      expect(mockOnError).toHaveBeenCalled();
    });

    it('handles edge case errors gracefully', () => {
      render(<NumericInput {...defaultProps} min={0} max={100} />);
      
      // Component should render without crashing
      expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<NumericInput {...defaultProps} min={0} max={1000} step={10} />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('aria-valuemin', '0');
      expect(input).toHaveAttribute('aria-valuemax', '1000');
      expect(input).toHaveAttribute('aria-valuenow', '100');
      expect(input).toHaveAttribute('aria-valuetext', '100');
    });

    it('has proper step button labels', () => {
      render(<NumericInput {...defaultProps} step={5} />);
      
      expect(screen.getByLabelText('Increase value by 5')).toBeInTheDocument();
      expect(screen.getByLabelText('Decrease value by 5')).toBeInTheDocument();
    });

    it('supports custom accessibility labels', () => {
      render(
        <NumericInput 
          {...defaultProps} 
          label="Custom Label"
          ariaLabel="Custom ARIA Label"
        />
      );
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('aria-label', 'Custom ARIA Label');
    });

    it('has proper focus management', async () => {
      const user = userEvent.setup();
      render(<NumericInput {...defaultProps} />);
      
      const input = screen.getByRole('spinbutton');
      await user.click(input);
      
      expect(input).toHaveFocus();
    });
  });

  describe('Edge Cases', () => {
    it('handles very large numbers', async () => {
      const user = userEvent.setup();
      render(<NumericInput {...defaultProps} max={Number.MAX_SAFE_INTEGER} />);
      
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '999999999');
      
      expect(mockOnChange).toHaveBeenCalledWith(999999999);
    });

    it('handles very small decimal values', async () => {
      const user = userEvent.setup();
      render(<NumericInput {...defaultProps} decimalPlaces={6} />);
      
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '0.000001');
      
      expect(mockOnChange).toHaveBeenCalledWith(0.000001);
    });

    it('handles rapid input changes', async () => {
      const user = userEvent.setup();
      render(<NumericInput {...defaultProps} />);
      
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '123');
      
      expect(mockOnChange).toHaveBeenCalledWith(123);
    });
  });
});
